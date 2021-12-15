/* https://api.tomtom.com/search/2/search/
    * {consulta}
    * .json?
    * limit=5&
    * lat=37.337&
    * lon=-121.89&
    * language=pt-br&
    * entityTypeSet=&
    * key=*****
    */



interface iAddress {
  municipalitySubdivision?: string,
  streetName?: string,
  municipality?: string,
  countrySubdivision?: string,
  postalCode?: string,
  extendedPostalCode?: string,
  countryCode?: string,
  country?: string,
  countryCodeISO3?: string,
  freeformAddress?: string,
  localName?: string
}
export interface iResult {
  type: string,
  id: string,
  score: number,
  dist: number,
  info: string,
  address: iAddress,
  poi?: {
    name: string,
    categorySet: [
      {
        id: number
      }
    ],
    categories: string[],
    classifications: [
      {
        code: string,
        names: [
          {
            nameLocale: string,
            name: string
          }
        ]
      }
    ]
  },
  position: {
    lat: number,
    lon: number
  },
  viewport: {
    topLeftPoint: {
      lat: number,
      lon: number
    },
    btmRightPoint: {
      lat: number,
      lon: number
    }
  },
  entryPoints: [
    {
      type: string,
      position: {
        lat: number,
        lon: number
      }
    }
  ]
}

export interface iTomTomSearch {
  summary: {
    query: string,
    queryType: string,
    queryTime: number,
    numResults: number,
    offset: number,
    totalResults: number,
    fuzzyLevel: number,
    geoBias: {
      lat: number,
      lon: number
    }
  },
  results: iResult[]
}