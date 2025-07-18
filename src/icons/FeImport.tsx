import React, { SVGProps } from 'react'

export function FeImport(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Feather Icon by Megumi Hano - https://github.com/feathericon/feathericon/blob/master/LICENSE */}<path fill="currentColor" fillRule="evenodd" d="m13 13.175l3.243-3.242l1.414 1.414L12 17.004l-5.657-5.657l1.414-1.414L11 13.175V2h2zM4 16h2v4h12v-4h2v4c0 1.1-.9 2-2 2H6c-1.1 0-2-.963-2-2z" /></svg>
  )
}
export default FeImport