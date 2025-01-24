import IWeapon from "@/interfaces/Weapon/IWeapon"
import IMaterial from "@/interfaces/Materials/INecessaryMaterial"

export default function WeaponMaterials(weapon: IWeapon): IMaterial[] {
  return [
    {
      ...weapon.ascention_family_forgery_material.two_stars,
      quantity: 0,
      show: false
    },
    {
      ...weapon.ascention_family_forgery_material.three_stars,
      quantity: 0,
      show: false
    },
    {
      ...weapon.ascention_family_forgery_material.four_stars,
      quantity: 0,
      show: false
    },
    {
      ...weapon.ascention_family_forgery_material.five_stars,
      quantity: 0,
      show: false
    },
    {
      ...weapon.ascention_family_forgery_material_2.two_stars,
      quantity: 0,
      show: false
    },
    {
      ...weapon.ascention_family_forgery_material_2.three_stars,
      quantity: 0,
      show: false
    },
    {
      ...weapon.ascention_family_forgery_material_2.four_stars,
      quantity: 0,
      show: false
    },
    {
      ...weapon.ascention_family_forgery_material_2.five_stars,
      quantity: 0,
      show: false
    },
  ]
}
