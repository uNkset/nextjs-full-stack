import { PromptObjectProps } from './Feed'

interface ProfileProps {
  name: string
  desc: string
  data: Array<PromptObjectProps>
  handleEdit: Function
  handleDelete: Function
}

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  console.log(data)

  return <div>Profile</div>
}

export default Profile
