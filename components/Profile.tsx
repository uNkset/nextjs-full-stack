interface ProfileProps {
  name: string
  desc: string
  data: any
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
  return <div>Profile</div>
}

export default Profile
