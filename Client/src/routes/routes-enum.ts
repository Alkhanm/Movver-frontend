// Estes enums represetam todas as rotas da aplicação.
// Será mais facil selecionar as rotas nos componentes usando esses enums do que simples strings 

//Todas as rotas públicas
export enum authRoutes {
  AUTH_LOGIN = "Entrar",
  AUTH_REGISTER_CLIENT = "Registrar Cliente",
  AUTH_REGISTER_DRIVER = "Registrar Motorista",

}

//As principais rotas privadas
export enum mainRoutes {
  MAIN = "Rotas Principais",

  HOME = "Inicio",
  PROFILE = "Perfil",
  FIND_DRIVER = "Encontrar motoristas",
}

//As subrotas
export enum secondaryRoutes {
  SECONDARY = "Rotas secundarias",

  LOCATION_FINDER = "selecionar rota",
  FREIGHTAGE = "Frete",
  FREIGHTAGE_CONFIRM = "Inicio do Frete",
  PROFILE_SETTINGS = "Configurações do Perfil"
}