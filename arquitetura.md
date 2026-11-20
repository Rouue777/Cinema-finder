graph TD
    %% Camada de Entrada
    Index[index.js] --> App[App.js]
    App --> Provider[Provider.jsx <br/><i>Estado Global / Context</i>]

    %% Camada de Layout
    Provider --> Layout[Layout.jsx]
    Layout --> TopBar[TopBar.jsx]
    Layout --> Aside[AsideIndex.jsx <br/><i>Barra Lateral</i>]
    Layout --> MapWrapper[Map/index.jsx <br/><i>Controlador de Mapa</i>]

    %% Componentes do Topo
    TopBar --> Logo[SiteLogo.jsx]
    TopBar --> MapMenu[MapTypeMenu.jsx <br/><i>Alterna Leaflet/MapLibre</i>]

    %% Hierarquia da Lista de Cinemas
    Aside --> ListIndex[CinemaList/index.jsx]
    ListIndex --> NearbyList[NearbyCinemasList.jsx]
    ListIndex --> FranchiseList[FranchiseCinemasList.jsx]
    
    NearbyList --> NearbyHead[NearbyHeader.jsx]
    FranchiseList --> FranchiseHead[FranchiseHeader.jsx]
    
    NearbyList --> BaseList[BaseCinemaList.jsx]
    FranchiseList --> BaseList
    BaseList --> ListItem[CinemaListItem.jsx]

    %% Hierarquia dos Mapas (Strategy Pattern)
    MapWrapper --> MapContext[Map/context.js]
    MapContext --> Leaflet[LeafletMap.jsx]
    MapContext --> Maplibre[MaplibreMap.jsx]

    %% Marcadores no Mapa
    Leaflet --> Markers[CinemaMarkers.jsx]
    Leaflet --> NearbyMarkers[NearbyCinemaMarkers.jsx]
    Maplibre --> Markers
    Maplibre --> NearbyMarkers

    %% Camada de Dados e Regras
    subgraph DataLayer [Camada de Dados & Lógica - /src/data/]
        CinemasJS[cinemas.js] --> AU[(auCinemas.json)]
        CinemasJS --> NZ[(nzCinemas.json)]
        NearbyJS[nearbyCinemas.js] --> Bounds[bounds.js]
        FranchisesJS[franchises.js] --> Assets[/assets/franchises/<br/><i>Logos SVG/PNG</i>/]
    end

    %% Conexões dos Dados com a Interface
    CinemasJS -.-> Provider
    NearbyJS -.-> NearbyList
    FranchisesJS -.-> FranchiseList
    FranchisesJS -.-> Markers
