import IResonator from "@/interfaces/Resonator/IResonator"

export default function SkillsMaterials(resonator: IResonator) {
  return [
    [
      {
        ...resonator.forte_family_forgery_material.forgery_materials.two_stars,
        quantity: 2
      },
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.two_stars,
        quantity: 2
      },
    ],
    [
      {
        ...resonator.forte_family_forgery_material.forgery_materials.two_stars,
        quantity: 3
      },
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.two_stars,
        quantity: 3
      },
    ],
    [
      {
        ...resonator.forte_family_forgery_material.forgery_materials.three_stars,
        quantity: 2
      },
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.three_stars,
        quantity: 2
      },
    ],
    [
      {
        ...resonator.forte_family_forgery_material.forgery_materials.three_stars,
        quantity: 3
      },
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.three_stars,
        quantity: 3
      },
    ],
    [
      {
        ...resonator.forte_family_forgery_material.forgery_materials.four_stars,
        quantity: 3
      },
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.four_stars,
        quantity: 2
      },
    ],
    [
      {
        ...resonator.forte_family_forgery_material.forgery_materials.four_stars,
        quantity: 5
      },
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.four_stars,
        quantity: 3
      },
      {
        ...resonator.skill_upgrade_material,
        quantity: 1
      }
    ],
    [
      {
        ...resonator.forte_family_forgery_material.forgery_materials.five_stars,
        quantity: 2
      },
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.five_stars,
        quantity: 2
      },
      {
        ...resonator.skill_upgrade_material,
        quantity: 1
      }
    ],
    [
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
    ],
    [
      {
        ...resonator.forte_family_forgery_material.forgery_materials.five_stars,
        quantity: 6
      },
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.five_stars,
        quantity: 4
      },
      {
        ...resonator.skill_upgrade_material,
        quantity: 1
      }
    ],
  ]
}