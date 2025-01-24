import IResonator from "@/interfaces/Resonator/IResonator"
import IMaterial from "@/interfaces/Materials/INecessaryMaterial"

export default function ResonatorMaterials(resonator: IResonator): IMaterial[] {
  return [
    {
      ...resonator.resonator_ascention_material,
      quantity: 0,
      show: false
    },
    {
      ...resonator.ascention_material,
      quantity: 0,
      show: false
    },
    {
      ...resonator.ascention_family_forgery_material?.two_stars,
      quantity: 0,
      show: false,
    },
    {
      ...resonator.ascention_family_forgery_material?.three_stars,
      quantity: 0,
      show: false,
    },
    {
      ...resonator.ascention_family_forgery_material?.four_stars,
      quantity: 0,
      show: false,
    },
    {
      ...resonator.ascention_family_forgery_material?.five_stars,
      quantity: 0,
      show: false,
    },
    {
      ...resonator.forte_family_forgery_material?.two_stars,
      quantity: 0,
      show: false
    },
    {
      ...resonator.forte_family_forgery_material?.three_stars,
      quantity: 0,
      show: false
    },
    {
      ...resonator.forte_family_forgery_material?.four_stars,
      quantity: 0,
      show: false
    },
    {
      ...resonator.forte_family_forgery_material?.five_stars,
      quantity: 0,
      show: false
    },
    {
      ...resonator.skill_upgrade_material,
      quantity: 0,
      show: false
    },
  ]
}
