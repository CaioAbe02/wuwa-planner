import IFamilyForgeyMaterial from "../Materials/Forgery/IFamilyForgeryMaterial"

export default  interface IWeapon {
  id: string,
  name: string,
  rarity: number,
  ascention_family_forgery_material: IFamilyForgeyMaterial,
  ascention_family_forgery_material_2: IFamilyForgeyMaterial,
}
