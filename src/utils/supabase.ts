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
  const statBonusMap: Record<string, string> = {
    'ATK+': 'atk',
    'Crit. Rate+': 'crit_rate',
    'Crit. DMG+': 'crit_dmg',
    'HP+': 'hp',
    'DEF+': 'def',
    'Healing Bonus+': 'healing_bonus',
    'Aero DMG Bonus+': 'aero',
    'Electro DMG Bonus+': 'electro',
    'Fusion DMG Bonus+': 'fusion',
    'Glacio DMG Bonus+': 'glacio',
    'Havoc DMG Bonus+': 'havoc',
    'Spectro DMG Bonus+': 'spectro',
  }

  const { data } = supabase.storage.from('stat_bonuses').getPublicUrl(`${statBonusMap[stat_bonus] ?? 'atk'}.webp`)

  return data.publicUrl
}
