
interface Self{
  self:any,
}

export default function Welcome({self}:Self) {
  return (
    <div>Welcome  {self['name']}</div>
  )
}
