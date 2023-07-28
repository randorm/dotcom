import { Profile } from "@/lib/__codegen__/graphql";
export interface IBio {
  profile: Profile;
}

export default function Bio({ profile }: IBio) {
  const now = new Date();
  const birthday = new Date(profile.birthday)
  const yearOfBirth = now.getFullYear() - birthday.getFullYear()

  return (
    <div className="bioSection">
      <p className="text-lg">{`${profile.firstName} ${profile.lastName}`}</p>
      <p className="mb-3 opacity-40">{`${profile.gender == "MALE" ? "Male" : "Female"} ${yearOfBirth} y. o.`}</p>
      <div className="opacity-90 leading-normal">{profile.bio}</div>
    </div>
  );
}
