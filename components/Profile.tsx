import { PromptObjectProps } from './Feed'
import PromptCard from './PromptCard'

interface ProfileProps {
  name: string
  desc: string
  data: Array<PromptObjectProps>
  handleEdit?: (arg: PromptObjectProps) => void
  handleDelete?: (arg: PromptObjectProps) => void
}

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((p) => (
          <PromptCard
            key={p._id}
            promptObj={p}
            handleEdit={() => handleEdit && handleEdit(p)}
            handleDelete={() => handleDelete && handleDelete(p)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile
