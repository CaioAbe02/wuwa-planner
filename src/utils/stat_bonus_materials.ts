import IResonator from "@/interfaces/Resonator/IResonator"

export function StatBonus0Material(resonator: IResonator) {
  return [
    {
      ...resonator.forte_family_forgery_material.four_stars,
      quantity: 3
    },
    {
      ...resonator.ascention_family_forgery_material.four_stars,
      quantity: 3
    },
  ]
}

export function StatBonus1Material(resonator: IResonator) {
  return [
    {
      ...resonator.forte_family_forgery_material.five_stars,
      quantity: 3
    },
    {
      ...resonator.ascention_family_forgery_material.five_stars,
      quantity: 3
    },
    {
      ...resonator.skill_upgrade_material,
      quantity: 1
    }
  ]
}