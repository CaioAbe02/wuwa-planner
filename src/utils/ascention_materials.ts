import IResonator from "@/interfaces/Resonator/IResonator"

export default function AscentionMaterials(resonator: IResonator) {
  return [
    [
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.two_stars,
        quantity: 4,
      }
    ],
    [
      {
        ...resonator.resonator_ascention_material,
        quantity: 3,
      },
      {
        ...resonator.ascention_material,
        quantity: 4,
      },
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.three_stars,
        quantity: 4,
      }
    ],
    [
      {
        ...resonator.resonator_ascention_material,
        quantity: 6,
      },
      {
        ...resonator.ascention_material,
        quantity: 8,
      },
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.three_stars,
        quantity: 8,
      },
    ],
    [
      {
        ...resonator.resonator_ascention_material,
        quantity: 9,
      },
      {
        ...resonator.ascention_material,
        quantity: 12,
      },
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.four_stars,
        quantity: 4,
      },
    ],
    [
      {
        ...resonator.resonator_ascention_material,
        quantity: 12,
      },
      {
        ...resonator.ascention_material,
        quantity: 16,
      },
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.four_stars,
        quantity: 8,
      },
    ],
    [
      {
        ...resonator.resonator_ascention_material,
        quantity: 16,
      },
      {
        ...resonator.ascention_material,
        quantity: 20,
      },
      {
        ...resonator.ascention_family_forgery_material.forgery_materials.five_stars,
        quantity: 4,
      },
    ]
  ]
}