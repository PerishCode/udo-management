import transpilers from './transpilers'

const Default = {
  transpile: transpilers.Default,
}

const ReadOnly = {
  transpile: transpilers.ReadOnly,
}

export default {
  Default,
  ReadOnly,
}
