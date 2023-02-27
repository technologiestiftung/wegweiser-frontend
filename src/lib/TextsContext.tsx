import { createContext, useContext } from 'react'

const defaultValue = {
  siteTitle: '',
  homeWelcomeTitle: '',
  homeWelcomeText: '',
  findOffersButtonText: '',
  directHelpButtonText: '',
  moreOffersKVBLinkText: '',
  moreOffersKVBLinkUrl: '',
  footerInfoPageLinkText: '',
  footerImprintLinkText: '',
  footerImprintLinkUrl: '',
  footerPrivacyLinkText: '',
  footerPrivacyLinkUrl: '',
  footerProjectOwnerLabel: '',
  footerTSBLogoAltText: '',
  footerTSBLogoLink: '',
  footerProjectExecutionerLabel: '',
  footerCityLABLogoAltText: '',
  footerCityLABLogoLink: '',
  footerCooperationLabel: '',
  footerProjectSponsorLabel: '',
  footerSentatskanzleiLogoAltText: '',
  footerSentatskanzleiLogoLink: '',
  psychiatricServicesLabel: '',
  psychiatricServicesPhoneNumber: '',
  emergencyServicesLabel: '',
  seelsorgeLabel: '',
  seelsorgePhoneNumber1: '',
  seelsorgePhoneNumber2: '',
  drugsPhoneLabel: '',
  drugsPhoneNumber1: '',
  kidsPhoneLabel: '',
  kidsPhoneNumber1: '',
  furtherEmergencyNumbersLabel: '',
  furtherEmergencyNumbersLinkText: '',
  furtherEmergencyNumbersLinkUrl: '',
  backText: '',
  neighborhoodCharlottenburgWilmersdorfLabel: '',
  neighborhoodCharlottenburgWilmersdorfPhoneNumber: '',
  emergencyCharlottenburgWilmersdorfPhoneNumber: '',
  neighborhoodFriedrichshainKreuzbergLabel: '',
  neighborhoodFriedrichshainKreuzbergPhoneNumber: '',
  emergencyFriedrichshainKreuzbergPhoneNumber: '',
  neighborhoodLichtenbergLabel: '',
  neighborhoodLichtenbergPhoneNumber: '',
  emergencyLichtenbergPhoneNumber: '',
  neighborhoodMarzahnHellersdorfLabel: '',
  neighborhoodMarzahnHellersdorfPhoneNumber: '',
  emergencyMarzahnHellersdorfPhoneNumber: '',
  neighborhoodMitteLabel: '',
  neighborhoodMittePhoneNumber: '',
  emergencyMittePhoneNumber: '',
  neighborhoodNeukoellnLabel: '',
  neighborhoodNeukoellnPhoneNumber: '',
  emergencyNeukoellnPhoneNumber: '',
  neighborhoodPankowLabel: '',
  neighborhoodPankowPhoneNumber: '',
  emergencyPankowPhoneNumber: '',
  neighborhoodReinickendorfLabel: '',
  neighborhoodReinickendorfPhoneNumber: '',
  emergencyReinickendorfPhoneNumber: '',
  neighborhoodSpandauLabel: '',
  neighborhoodSpandauPhoneNumber: '',
  emergencySpandauPhoneNumber: '',
  neighborhoodSteglitzZehlendorfLabel: '',
  neighborhoodSteglitzZehlendorfPhoneNumber: '',
  emergencySteglitzZehlendorfPhoneNumber: '',
  neighborhoodTempelhofSchoenebergLabel: '',
  neighborhoodTempelhofSchoenebergPhoneNumber: '',
  emergencyTempelhofSchoenebergPhoneNumber: '',
  neighborhoodTrepotowKoepenickLabel: '',
  neighborhoodTrepotowKoepenickPhoneNumber: '',
  emergencyTrepotowKoepenickPhoneNumber: '',
  welcomeFiltersHeadline: '',
  welcomeFiltersText: '',
  filtersButtonTextFilteredSingular: '',
  filtersButtonTextFilteredPlural: '',
  filtersButtonTextFilteredNoResults: '',
  filtersButtonTextFilteredNoResultsHint: '',
  filtersButtonTextAllFilters: '',
  filtersGeoSearchLabel: '',
  filtersSearchTargetLabel: '',
  filtersSearchTargetLabelOnCard: '',
  languagesLabel: '',
  geolocationForbidden: '',
  opened: '',
  alwaysOpened: '',
  mapPageTitle: '',
  weekdayMonday: '',
  weekdayTuesday: '',
  weekdayWednesday: '',
  weekdayThursday: '',
  weekdayFriday: '',
  weekdaySaturday: '',
  weekdaySunday: '',
  filteredResultsAmountSingular: '',
  filteredResultsAmountPlural: '',
  resetFilters: '',
  reset: '',
  noResults: '',
  seeMap: '',
  seeList: '',
  filterLabel: '',
  backToHome: '',
  accessibleLabel: '',
  openFacilityLinkText: '',
  filtersTagsLabelOnCard: '',
  andAllOtherFiltersLabel: '',
  allOtherFiltersLabel: '',
  clickToExpandPopupLabel: '',
  multipleFacilitiesPopupTitle: '',
  disclaimerPrefix: '',
  disclaimerContent: '',
}

export type TextsMapType = typeof defaultValue

const textsContext = createContext<TextsMapType>(defaultValue)

export const useTexts = (): TextsMapType => {
  const texts = useContext(textsContext)
  return texts
}

export const TextsProvider = textsContext.Provider
