import Image from "next/image";
import usersProfilePic from "../../public/defaultProfilePic.png"

//user profile picture component
export default function UserPP() {
  return (
    <div className="UserPP">
      <Image src={usersProfilePic}
        fill="true"
        alt="Your profile Pic"
        sizes="20vw"
      />
    </div>
  )
}
