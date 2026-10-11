import apiClient from "./apiClient";
import {
  CreateSkillInterface,
  EditSkillInterface,
} from "../interfaces/skill.interface";

export default async function getSkills() {
    const { data } = await apiClient.get("skills");
    return data;
}

export async function getSkillById(id: number) {
  const { data } = await apiClient.get("skills/" + id);
  return data;
}

export async function createSkill(skill: CreateSkillInterface) {
  const { data } = await apiClient.post("skills", skill);
  return data;
}

export async function editSkill(skill: EditSkillInterface, id: number) {
  const { data } = await apiClient.put("skills/" + id, skill);
  return data;
}

export async function archiveSkill(id: number) {
  const { data } = await apiClient.patch("skills/" + id + "/archive");
  return data;
}

export async function deleteSkill(id: number) {
  const { data } = await apiClient.delete("skills/" + id);
  return data;
}