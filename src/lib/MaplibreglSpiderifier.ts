import { Popup, Marker, Map, Feature, LngLatLike } from 'maplibre-gl'

interface SpiderParamType {
  x: number
  y: number
  angle: number
  legLength: number
  index: number
}

interface MarkerElementsType {
  parent: HTMLDivElement
  line: HTMLDivElement
  marker: HTMLDivElement
}

interface MarkerObjectType<MarkerType> {
  marker: MarkerType
  elements: MarkerElementsType
  maplibreMarker: Marker
  spiderParam: SpiderParamType
}

interface UserOptionsType<MarkerType> {
  onClick: (e: Event, markerObject: MarkerObjectType<MarkerType>) => void
  onMouseenter: (e: Event, markerObject: MarkerObjectType<MarkerType>) => void
  onMouseleave: (e: Event, markerObject: MarkerObjectType<MarkerType>) => void
  markerWidth: number
  markerHeight: number
  initializeMarker: (markerObject: MarkerObjectType<MarkerType>) => void
}

const util = {
  each: eachFn,
  map: mapFn,
  mapTimes: mapTimesFn,
  eachTimes: eachTimesFn,
}

const twoPi = Math.PI * 2

const NULL_FUNCTION = (): void => undefined

export default class MaplibreglSpiderifier<MarkerType> {
  map: Map
  options: {
    circleSpiralSwitchover: number
    circleFootSeparation: number
    spiralFootSeparation: number
    spiralLengthStart: number
    spiralLengthFactor: number
    onClick: UserOptionsType<MarkerType>['onClick']
    onMouseenter: UserOptionsType<MarkerType>['onMouseenter']
    onMouseleave: UserOptionsType<MarkerType>['onMouseleave']
    initializeMarker: UserOptionsType<MarkerType>['initializeMarker']
    animationSpeed: number
  }
  previousMarkerObjects: MarkerObjectType<MarkerType>[]

  constructor(map: Map, userOptions: Partial<UserOptionsType<MarkerType>>) {
    this.map = map
    this.options = {
      circleSpiralSwitchover: 9, // show spiral instead of circle from this marker count upwards
      // 0 -> always spiral; Infinity -> always circle
      circleFootSeparation: 40, // related to circumference of circle
      spiralFootSeparation: 28, // related to size of spiral (experiment!)
      spiralLengthStart: 24, // ditto
      spiralLengthFactor: 4, // ditto
      onClick: NULL_FUNCTION,
      onMouseenter: NULL_FUNCTION,
      onMouseleave: NULL_FUNCTION,
      initializeMarker: NULL_FUNCTION,
      animationSpeed: 100,
      ...userOptions,
    }
    this.previousMarkerObjects = []
  }

  public each(callback: (marker: MarkerObjectType<MarkerType>) => void): void {
    util.each<MarkerObjectType<MarkerType>>(
      this.previousMarkerObjects,
      callback
    )
  }

  public spiderfy(lngLat: LngLatLike, markers: MarkerType[]): void {
    const spiderParams = this.generateSpiderParams(markers.length)
    let markerObjects: MarkerObjectType<MarkerType>[] = []

    this.unspiderfy()

    markerObjects = util.map<MarkerType, MarkerObjectType<MarkerType>>(
      markers,
      (marker, index) => {
        const spiderParam = spiderParams[index]
        const elements = this.createMarkerElements(spiderParam)

        const maplibreMarker = new Marker(elements.parent).setLngLat(lngLat)

        const markerObject: MarkerObjectType<MarkerType> = {
          marker,
          elements,
          maplibreMarker,
          spiderParam,
        }

        this.options.initializeMarker(markerObject)

        elements.parent.addEventListener('click', (e: Event) => {
          this.options.onClick(e, markerObject)
        })
        elements.parent.addEventListener('mouseenter', (e: Event) => {
          this.options.onMouseenter(e, markerObject)
        })
        elements.parent.addEventListener('mouseleave', (e: Event) => {
          this.options.onMouseleave(e, markerObject)
        })

        return markerObject
      }
    )

    util.each<MarkerObjectType<MarkerType>>(
      markerObjects.reverse(),
      (markerObject) => {
        markerObject.maplibreMarker.addTo(this.map)
      }
    )

    setTimeout(() => {
      util.each(markerObjects.reverse(), (markerObject, index) => {
        markerObject.elements.parent.className = (
          markerObject.elements.parent.className || ''
        ).replace('initial', '')
        markerObject.elements.parent.style.transitionDelay = `${
          (this.options.animationSpeed / 1000 / markerObjects.length) * index
        }s`
      })
    })

    this.previousMarkerObjects = markerObjects
  }

  public unspiderfy(): void {
    util.each<MarkerObjectType<MarkerType>>(
      this.previousMarkerObjects.reverse(),
      (oldMarkerObject, index) => {
        oldMarkerObject.elements.parent.style['transitionDelay'] = `${
          (this.options.animationSpeed /
            1000 /
            this.previousMarkerObjects.length) *
          index
        }s`
        oldMarkerObject.elements.parent.className += ' exit'

        setTimeout(() => {
          oldMarkerObject.maplibreMarker.remove()
        }, this.options.animationSpeed + 100) //Wait for 100ms more before clearing the DOM
      }
    )
    this.previousMarkerObjects = []
  }

  private generateSpiderParams(count: number): SpiderParamType[] {
    if (count >= this.options.circleSpiralSwitchover) {
      return this.generateSpiralParams(count)
    } else {
      return this.generateCircleParams(count)
    }
  }

  private generateSpiralParams(count: number): SpiderParamType[] {
    let legLength = this.options.spiralLengthStart
    let angle = 0
    return util.mapTimes(count, (index) => {
      angle =
        angle + (this.options.spiralFootSeparation / legLength + index * 0.0005)
      const pt = {
        x: legLength * Math.cos(angle),
        y: legLength * Math.sin(angle),
        angle: angle,
        legLength: legLength,
        index: index,
      }
      legLength = legLength + (twoPi * this.options.spiralLengthFactor) / angle
      return pt
    })
  }

  private generateCircleParams(count: number): SpiderParamType[] {
    const circumference = this.options.circleFootSeparation * (2 + count)
    const legLength = circumference / twoPi // = radius from circumference
    const angleStep = twoPi / count

    return util.mapTimes<SpiderParamType>(count, (index) => {
      const angle = index * angleStep
      return {
        x: legLength * Math.cos(angle),
        y: legLength * Math.sin(angle),
        angle: angle,
        legLength,
        index: index,
      }
    })
  }

  private createMarkerElements(
    spiderParam: SpiderParamType
  ): MarkerElementsType {
    const parentElem = document.createElement('div')
    const markerElem = document.createElement('div')
    const lineElem = document.createElement('div')

    parentElem.className = 'spidered-marker animate initial'
    lineElem.className = 'line-div'
    markerElem.className = 'icon-div'

    parentElem.appendChild(lineElem)
    parentElem.appendChild(markerElem)

    parentElem.style.marginLeft = `${spiderParam.x}px`
    parentElem.style.marginTop = `${spiderParam.y}px`

    lineElem.style.height = `${spiderParam.legLength}px`
    lineElem.style.transform = `rotate(${spiderParam.angle - Math.PI / 2}rad)`

    return { parent: parentElem, line: lineElem, marker: markerElem }
  }
}

// Utility
function eachFn<ItemType = unknown>(
  array: ItemType[],
  iterator: (item: ItemType, idx: number) => unknown
): void {
  let i = 0
  if (!array || !array.length) return
  for (i = 0; i < array.length; i++) {
    iterator(array[i], i)
  }
}

function eachTimesFn(count: number, iterator: (idx: number) => void): void {
  if (!count) return
  for (let i = 0; i < count; i++) {
    iterator(i)
  }
}

function mapFn<ItemType = unknown, ReturnedType = unknown>(
  array: ItemType[],
  iterator: (item: ItemType, idx: number) => ReturnedType
): ReturnedType[] {
  const result: ReturnedType[] = []
  eachFn(array, (item, i) => {
    result.push(iterator(item, i))
  })
  return result
}

function mapTimesFn<ReturnedType = unknown>(
  count: number,
  iterator: (idx: number) => ReturnedType
): ReturnedType[] {
  const result: ReturnedType[] = []
  eachTimesFn(count, (i) => {
    result.push(iterator(i))
  })
  return result
}