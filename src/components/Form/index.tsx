import transpilers from './transpilers'

const Default = {
  transpile: transpilers.Default,
}

const ReadOnly = {
  transpile: transpilers.ReadOnly,
}

const Mini = {
  transpile: transpilers.Mini,
}

export default {
  Default,
  ReadOnly,
  Mini,
}
