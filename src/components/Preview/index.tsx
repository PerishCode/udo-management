import XForm from '@x-form/react-jsonschema'
import transpile from './transpiler'

export default function Preview({ schema, className }) {
  return (
    <XForm
      schema={schema}
      formData={{}}
      onChange={() => {}}
      className={className}
      extensions={{ transpile }}
    />
  )
}
