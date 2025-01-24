import IResonator from "@/interfaces/Resonator/IResonator"

export function InherentSkill0Material(resonator: IResonator) {
  return [
    {
      ...resonator.forte_family_forgery_material.three_stars,
      quantity: 3
    },
    {
      ...resonator.ascention_family_forgery_material.three_stars,
      quantity: 3
    },
    {
      ...resonator.skill_upgrade_material,
      quantity: 1
    }
  ]
}

export function InherentSkill1Material(resonator: IResonator) {
  return [
    {
      ...resonator.forte_family_forgery_material.four_stars,
      quantity: 3
    },
    {
      ...resonator.ascention_family_forgery_material.four_stars,
      quantity: 3
    },
    {
      ...resonator.skill_upgrade_material,
      quantity: 1
    }
  ]
}