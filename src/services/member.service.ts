import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/user";

export interface Member {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  image?: string;
}

export const getMembers = async (
  page: number,
  perPage: number,
  search?: string,
  from?: string,
  to?: string
) => {
  const res = await axios.get(API_URL, {
    params: {
      page,
      perPage,
      search,
      from: from ? new Date(from).toISOString() : undefined,
      to: to ? new Date(to).toISOString() : undefined,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};

export const createMember = async (member: FormData) => {
  const res = await axios.post(API_URL, member, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateMember = async (id: number, member: FormData) => {
  const res = await axios.put(`${API_URL}/${id}`, member, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteMember = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
