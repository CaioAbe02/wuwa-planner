import IResonatorAscentionMaterial from "../Materials/ResonatorAscention/IResonatorAscentionMaterial"
import IAscentionMaterial from "../Materials/Ascention/IAscentionMaterial"
import IFamilyForgeyMaterial from "../Materials/Forgery/IFamilyForgeryMaterial"
import IStatBonus from "../Forte/IStatBonus"
import ISkillUpgradeMaterial from "../Materials/SkillUpgrade/ISkillUpgradeMaterial"

export default interface IResonator {
  id: string,
  name: string,
  rarity: number,
  element: string,
  resonator_ascention_material_id: IResonatorAscentionMaterial,
  ascention_material_id: IAscentionMaterial,
  ascention_family_forgery_material_id: IFamilyForgeyMaterial,
  forte_family_forgery_material_id: IFamilyForgeyMaterial,
  skill_upgrade_material_id: ISkillUpgradeMaterial,
  resonator_ascention_material: IResonatorAscentionMaterial,
  ascention_material: IAscentionMaterial,
  ascention_family_forgery_material: IFamilyForgeyMaterial,
  forte_family_forgery_material: IFamilyForgeyMaterial,
  skill_upgrade_material: ISkillUpgradeMaterial,
  inherent_skills: string[],
  stats_bonus: IStatBonus[],
}
