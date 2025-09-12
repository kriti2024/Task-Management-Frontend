import { Button } from "@/components/ui/button";
import type { Member } from "@/services/member.service";
import { useNavigate } from "react-router";
interface MemberRowProps {
  member: Member;
  onView: () => void;
  onEdit: () => void;
  onDelete: (id: number) => void;
}

export default function MemberRow({
  member,
  onEdit,
  onDelete,
}: MemberRowProps) {
  const navigate = useNavigate();
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
      <td className="p-2 border text-center">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full
      ${
        member.role === "ADMIN"
          ? "bg-blue-100 text-blue-700"
          : "bg-green-100 text-green-700"
      }`}
        >
          {member.role || "User"}
        </span>
      </td>

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
        <Button
          onClick={() => navigate(`/admin-dashboard/members/${member.id}`)}
        >
          View
        </Button>{" "}
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
