import {useSelf} from '../store/selfStore'

export default function Welcome() {
  const self = useSelf(s=>s.self);
  
  return (
    <div>Welcome  {self['name']}</div>
  )
}
