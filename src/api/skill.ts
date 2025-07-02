import { useApi } from "../hooks/useApi";
import {
  CreateSkillInterface,
  EditSkillInterface,
} from "../interfaces/skill.interface";

const api = useApi();

export default async function getSkills() {
  try {
    const { data } = await api.get("skills");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getSkillById(id: number) {
  try {
    const { data } = await api.get("skills/" + id);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createSkill(skill: CreateSkillInterface) {
  try {
    const { data } = await api.post("skills", skill);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function editSkill(skill: EditSkillInterface, id: number) {
  try {
    const { data } = await api.put("skills/" + id, skill);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function archiveSkill(id: number) {
  try {
    const { data } = await api.patch("skills/" + id + "/archive");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
