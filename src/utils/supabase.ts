import { supabase } from "@/supabase"

export function getResonatorIconUrl(resonator_name: string) {
  const { data } = supabase.storage.from('resonators').getPublicUrl(`${resonator_name}/icon.webp`)

  return data.publicUrl
}

export function getResonatorInherentSkillIconUrl(resonator_name: string, position: number) {
  const { data } = supabase.storage.from('resonators').getPublicUrl(`${resonator_name}/inherent_skill_${position}.webp`)

  return data.publicUrl
}

export function getWeaponIconUrl(weapon_name: string) {
  const { data } = supabase.storage.from('weapons').getPublicUrl(`${weapon_name.replaceAll(' ', '_')}.webp`)

  return data.publicUrl
}

export function getMaterialIconUrl(material_name: string) {
  const { data } = supabase.storage.from('materials').getPublicUrl(`${material_name.replaceAll(' ', '_')}.webp`)

  return data.publicUrl
}

export function getIconUrl(icon_name: string) {
  const { data } = supabase.storage.from('icons').getPublicUrl(`${icon_name.replaceAll(' ', '_')}.webp`)

  return data.publicUrl
}

export function getStatBonusIconUrl(stat_bonus: string) {
  let file_name

  switch (stat_bonus) {
    case 'ATK+': file_name = 'atk'
    case 'Crit. Rate+': file_name = 'crit_rate'
    case 'Crit. DMG+': file_name = 'crit_dmg'
    case 'HP+': file_name = 'hp'
    case 'DEF+': file_name = 'def'
    case 'Healing Bonus+': file_name = 'healing_bonus'
    default: file_name = 'atk'
  }

  const { data } = supabase.storage.from('stat_bonuses').getPublicUrl(`${file_name}.webp`)

  return data.publicUrl
}
