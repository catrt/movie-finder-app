// Component
export class Component {
  constructor(payload = {}) {
    const {
      tagName = "div",
      props = {},
      state = {},
    } = payload
    this.el = document.createElement(tagName)
    this.state = state
    this.props = props
    this.render()
  }
  render() {
    // ...
  }
}

// Router
function routeRender(routes) {
  if(!location.hash) {
    history.replaceState("", "", "/#/")
  }

  const routeView = document.querySelector("router-view")
  const [hash, queryString = ""] = location.hash.split("?")

  const query = queryString.split("&")
                           .reduce((acc, cur) => {
                             const [key, val] = cur.split("=")
                             acc[key] = val
                             return acc
                           }, {})
  history.replaceState(query, "")

  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
  routeView.innerHTML = ""
  routeView.append(new currentRoute.component().el)

  window.scrollTo(0, 0)
}
export function createRouter(routes) {
  return function () {
    window.addEventListener("popstate", () => {
      routeRender(routes)
    })
    routeRender(routes)
  }
}

// Store
export class Store {
  constructor(state) {
    this.state = {}
    this.observers = {}

    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: val => {
          state[key] = val
          if(Array.isArray(this.observers[key])) {
            this.observers[key].forEach(observer => observer())
          }
        }
      })
    }
  }
  subscribe(key, cb) {
    Array.isArray(this.observers[key]) 
      ? this.observers[key].push(cb)
      : this.observers[key] = [cb]
  }
}
