import { supabase } from "@/supabase"

export function getResonatorIconUrl(resonator_name: string) {
  const { data } = supabase.storage.from('resonators').getPublicUrl(`${resonator_name}/icon.webp`)

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