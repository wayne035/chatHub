
interface Self{
  self:{name:string,id:string},
}

export default function Welcome({self}:Self) {
  return (
    <div>Welcome  {self['name']}</div>
  )
}
