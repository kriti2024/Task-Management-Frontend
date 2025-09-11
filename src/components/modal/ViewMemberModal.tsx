import { Button } from "@/components/ui/button";

export default function ViewMemberModal({ member, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 shadow">
        <h2 className="text-lg font-semibold mb-4">Member Details</h2>
        <div className="space-y-2">
          <img
            src={member.image || "https://via.placeholder.com/100"}
            alt={member.username}
            className="w-20 h-20 rounded-full mx-auto"
          />
          <p>
            <strong>Name:</strong> {member.username}
          </p>
          <p>
            <strong>Email:</strong> {member.email}
          </p>
          <p>
            <strong>Role:</strong> {member.role}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(member.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
