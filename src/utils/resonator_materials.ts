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
      ...resonator.ascention_family_forgery_material?.forgery_materials?.two_stars,
      quantity: 0,
      show: false,
    },
    {
      ...resonator.ascention_family_forgery_material?.forgery_materials?.three_stars,
      quantity: 0,
      show: false,
    },
    {
      ...resonator.ascention_family_forgery_material?.forgery_materials?.four_stars,
      quantity: 0,
      show: false,
    },
    {
      ...resonator.ascention_family_forgery_material?.forgery_materials?.five_stars,
      quantity: 0,
      show: false,
    },
    {
      ...resonator.forte_family_forgery_material?.forgery_materials?.two_stars,
      quantity: 0,
      show: false
    },
    {
      ...resonator.forte_family_forgery_material?.forgery_materials?.three_stars,
      quantity: 0,
      show: false
    },
    {
      ...resonator.forte_family_forgery_material?.forgery_materials?.four_stars,
      quantity: 0,
      show: false
    },
    {
      ...resonator.forte_family_forgery_material?.forgery_materials?.five_stars,
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
