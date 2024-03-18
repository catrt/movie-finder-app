import { Store } from "../core/core";

interface State {
  photo: string
  name: string
  email: string
  blog: string
  github: string
  repository: string
}

export default new Store<State>({
  photo: "https://avatars.githubusercontent.com/u/89022828?v=4",
  name: "CATRT / KimRyoungTae",
  email: "rt990122@gmail.com",
  blog: "https://catrt.tistory.com/",
  github: "https://github.com/catrt",
  repository: "https://github.com/catrt/movie-finder-app",
})
