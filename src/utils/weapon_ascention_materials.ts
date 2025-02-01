import IWeapon from "@/interfaces/Weapon/IWeapon"

export function FiveStarsWeaponAscentionMaterials(weapon: IWeapon) {
  return [
    [
      {
        ...weapon.ascention_family_forgery_material.two_stars,
        quantity: 6
      }
    ],
    [
      {
        ...weapon.ascention_family_forgery_material.three_stars,
        quantity: 6
      },
      {
        ...weapon.ascention_family_forgery_material_2.two_stars,
        quantity: 6
      }
    ],
    [
      {
        ...weapon.ascention_family_forgery_material.four_stars,
        quantity: 4
      },
      {
        ...weapon.ascention_family_forgery_material_2.three_stars,
        quantity: 8
      }
    ],
    [
      {
        ...weapon.ascention_family_forgery_material.four_stars,
        quantity: 6
      },
      {
        ...weapon.ascention_family_forgery_material_2.four_stars,
        quantity: 6
      }
    ],
    [
      {
        ...weapon.ascention_family_forgery_material.five_stars,
        quantity: 4
      },
      {
        ...weapon.ascention_family_forgery_material_2.five_stars,
        quantity: 8
      }
    ],
    [
      {
        ...weapon.ascention_family_forgery_material.five_stars,
        quantity: 8
      },
      {
        ...weapon.ascention_family_forgery_material_2.five_stars,
        quantity: 12
      }
    ]
  ]
}

export function FourStarsWeaponAscentionMaterials(weapon: IWeapon) {
  return [
    [
      {
        ...weapon.ascention_family_forgery_material.two_stars,
        quantity: 5
      }
    ],
    [
      {
        ...weapon.ascention_family_forgery_material.three_stars,
        quantity: 5
      },
      {
        ...weapon.ascention_family_forgery_material_2.two_stars,
        quantity: 5
      }
    ],
    [
      {
        ...weapon.ascention_family_forgery_material.four_stars,
        quantity: 4
      },
      {
        ...weapon.ascention_family_forgery_material_2.three_stars,
        quantity: 7
      }
    ],
    [
      {
        ...weapon.ascention_family_forgery_material.four_stars,
        quantity: 5
      },
      {
        ...weapon.ascention_family_forgery_material_2.four_stars,
        quantity: 5
      }
    ],
    [
      {
        ...weapon.ascention_family_forgery_material.five_stars,
        quantity: 4
      },
      {
        ...weapon.ascention_family_forgery_material_2.five_stars,
        quantity: 7
      }
    ],
    [
      {
        ...weapon.ascention_family_forgery_material.five_stars,
        quantity: 7
      },
      {
        ...weapon.ascention_family_forgery_material_2.five_stars,
        quantity: 10
      }
    ]
  ]
}
