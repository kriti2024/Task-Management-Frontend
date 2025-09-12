import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getMembers } from "@/services/member.service"; 
import { Button } from "@/components/ui/button";

export default function MemberDetailsPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        const data = await getMembers(1, 1000);
        const found = data.users.find((u: any) => u.id === Number(id));
        setMember(found);
      } catch (err) {
        console.error("Failed to fetch member:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!member) return <p className="text-center mt-10">Member not found</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Member Details</h2>
      <div className="space-y-2">
        <img
          src={
            member.image
              ? `${import.meta.env.VITE_API_URL}${member.image}`
              : "https://via.placeholder.com/100"
          }
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
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
    </div>
  );
}
