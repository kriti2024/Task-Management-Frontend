import { Button } from "@/components/ui/button";
import type { Member } from "@/services/member.service";

interface MemberRowProps {
  member: Member;
  onView: () => void;
  onEdit: () => void;
  onDelete: (id: number) => void;
}

export default function MemberRow({
  member,
  onView,
  onEdit,
  onDelete,
}: MemberRowProps) {
  return (
    <tr>
      {/* Profile Image */}
      <td className="p-2 border">
        <img
          src={
            member.image
              ? `${import.meta.env.VITE_API_URL}${member.image}`
              : "https://via.placeholder.com/40"
          }
          alt={member.username}
          className="w-10 h-10 rounded-full object-cover"
        />
      </td>

      <td className="p-2 border">{member.username}</td>

      {/* Email */}
      <td className="p-2 border">{member.email}</td>

      {/* Role */}
      <td className="p-2 border">{member.role || "User"}</td>

      {/* Created At */}
      <td className="p-2 border">
        {new Date(member.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>

      {/* Actions */}
      <td className="p-2 border flex gap-2">
        <Button size="sm" variant="outline" onClick={onView}>
          View
        </Button>
        <Button size="sm" variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(member.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
