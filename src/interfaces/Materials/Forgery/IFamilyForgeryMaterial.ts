import IForgeryMaterial from "./IForgeryMaterial"

export default interface IFamilyForgeryMaterial {
  id: string,
  name: string,
  two_stars: IForgeryMaterial,
  three_stars: IForgeryMaterial,
  four_stars: IForgeryMaterial,
  five_stars: IForgeryMaterial,
}