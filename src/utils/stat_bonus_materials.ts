import IResonator from "@/interfaces/Resonator/IResonator"

export function StatBonus0Material(resonator: IResonator) {
  return [
    {
      ...resonator.forte_family_forgery_material.forgery_materials.four_stars,
      quantity: 3
    },
    {
      ...resonator.ascention_family_forgery_material.forgery_materials.four_stars,
      quantity: 3
    },
  ]
}

export function StatBonus1Material(resonator: IResonator) {
  return [
    {
      ...resonator.forte_family_forgery_material.forgery_materials.five_stars,
      quantity: 3
    },
    {
      ...resonator.ascention_family_forgery_material.forgery_materials.five_stars,
      quantity: 3
    },
    {
      ...resonator.skill_upgrade_material,
      quantity: 1
    }
  ]
}