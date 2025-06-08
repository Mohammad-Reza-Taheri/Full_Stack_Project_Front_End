import React, { SVGProps } from 'react'

export function FeExport(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Feather Icon by Megumi Hano - https://github.com/feathericon/feathericon/blob/master/LICENSE */}<path fill="currentColor" fillRule="evenodd" d="M13 5.828V17h-2V5.828L7.757 9.071L6.343 7.657L12 2l5.657 5.657l-1.414 1.414zM4 16h2v4h12v-4h2v4c0 1.1-.9 2-2 2H6c-1.1 0-2-.963-2-2z" /></svg>
  )
}
export default FeExport