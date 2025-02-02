import IFamilyForgeyMaterial from "../Materials/Forgery/IFamilyForgeryMaterial"
import { WeaponType } from "@/enums/WeaponType"

export default  interface IWeapon {
  id: string,
  name: string,
  type: WeaponType,
  rarity: number,
  ascention_family_forgery_material: IFamilyForgeyMaterial,
  ascention_family_forgery_material_2: IFamilyForgeyMaterial,
}
