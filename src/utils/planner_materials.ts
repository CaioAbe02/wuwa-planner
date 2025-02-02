import IFamilyForgeryMaterial from "@/interfaces/Materials/Forgery/IFamilyForgeryMaterial"

export function addMaterialFromMatrix(necessary_materials: any[], materials: any, i: number, j: number) {
  const existing_material = necessary_materials.find(material => material.id === materials[i][j].id)
  if (existing_material) {
    existing_material.quantity += materials[i][j].quantity
    existing_material.show = true
  }
}

export function getForgedMaterialQuantity(card_inv: any[], material_id: string) {
  return (card_inv.find(material => material.id === material_id)?.forged_quantity)
}

export function getMaterialFileName(material_name: string): string {
  return (material_name.replace(/ /g, '_'))
}

export function isMaterialCompleted(card_inv: any[], material_id: string) {
  const material = card_inv.find(card_material => card_material.id === material_id)

  if (material) {
    if (material.quantity + material.forged_quantity >= material.necessary_quantity) {
      return true
    }
  }
  return false
}

export function getInitialMaterialQuantity(initial_materials: any[], material_id: string) {
  const material = initial_materials.find(material => material.id === material_id)

  if (material) {
    return material.quantity
  }

  return 0
}

export function getInvMaterialQuantity(inv_store: any, card_inv: any[], initial_materials: any[], material_id: string, necessary_quantity: number) {
  const material = inv_store.getForgedInvMaterial(material_id)
  const card_inv_material = card_inv.find(card_material => card_material.id === material?.id)
  const initial_material = initial_materials.find(initial_material => initial_material.id === material?.id)

  if (material) {
    if (card_inv_material) {
      card_inv_material.quantity += material.quantity
      card_inv_material.necessary_quantity += necessary_quantity

      initial_material.quantity += material.quantity
    }
    else {
      card_inv.push({
        id: material_id,
        quantity: material.quantity,
        necessary_quantity: necessary_quantity,
        forged_quantity: 0,
      })
      initial_materials.push({
        id: material_id,
        quantity: material.quantity,
      })
    }
  }
}

export function updateMaterialsToChange(materials_to_change: any, material_id: string, new_quantity: number, forged_quantity: number, forge_multiplier: number) {
  if (materials_to_change[material_id]) {
    materials_to_change[material_id] += new_quantity - forged_quantity * forge_multiplier
  }
  else {
    materials_to_change[material_id] = new_quantity - forged_quantity * forge_multiplier
  }
}

export function forgeMaterial(inv_store: any, card_inv: any[], family_material: IFamilyForgeryMaterial[], materials_to_change: any, material_id: string) {
  const material = inv_store.getForgedInvMaterial(material_id)
  let card_inv_material = card_inv.find(card_material => card_material.id === material?.id)

  if (material) {
    const family = family_material.find(family => family.id === material.family_id)
    let new_quantity = 0
    let forge_quantity = 0
    let forge_quantity2 = 0
    let forge_quantity3 = 0
    let forge_quantity4 = 0

    if (card_inv_material.quantity >= card_inv_material.necessary_quantity) {
      new_quantity = card_inv_material.quantity - card_inv_material.necessary_quantity
    }

    if (material.family_id !== null) {
      if (material.rarity === 2) {
        updateMaterialsToChange(materials_to_change, material_id, new_quantity, forge_quantity, 0)
      }
      else if (material.rarity === 3) {
        let two_stars_material = card_inv.find(material => material.id === family?.two_stars.id)

        while (true) {
          if (forge_quantity + card_inv_material.quantity >= card_inv_material.necessary_quantity ||
              two_stars_material.quantity - 3 <= two_stars_material.necessary_quantity
            ) {
            break
          }
          forge_quantity += 1
          two_stars_material.quantity -= 3
          card_inv_material.forged_quantity += 1
        }
        updateMaterialsToChange(materials_to_change, material_id, new_quantity, forge_quantity, 0)
        updateMaterialsToChange(materials_to_change, two_stars_material.id, 0, forge_quantity, 3)
      }
      else if (material.rarity === 4) {
        let two_stars_material = card_inv.find(material => material.id === family?.two_stars.id)
        let three_stars_material = card_inv.find(material => material.id === family?.three_stars.id)

        while (true) {
          if (forge_quantity2 + card_inv_material.quantity >= card_inv_material.necessary_quantity ||
              two_stars_material.quantity - 9 <= two_stars_material.necessary_quantity
            ) {
            break
          }
          forge_quantity += 1
          forge_quantity2 += 1
          two_stars_material.quantity -= 9
          card_inv_material.forged_quantity += 1
        }
        while (true) {
          if (forge_quantity3 + card_inv_material.quantity >= card_inv_material.necessary_quantity ||
              three_stars_material.quantity - 3 <= three_stars_material.necessary_quantity
            ) {
            break
          }
          forge_quantity += 1
          forge_quantity3 += 1
          three_stars_material.quantity -= 3
          card_inv_material.forged_quantity += 1
        }
        updateMaterialsToChange(materials_to_change, material_id, new_quantity, forge_quantity, 0)
        updateMaterialsToChange(materials_to_change, two_stars_material.id, 0, forge_quantity2, 9)
        updateMaterialsToChange(materials_to_change, three_stars_material.id, 0, forge_quantity3, 3)
      }
      else if (material.rarity === 5) {
        let two_stars_material = card_inv.find(material => material.id === family?.two_stars.id)
        let three_stars_material = card_inv.find(material => material.id === family?.three_stars.id)
        let four_stars_material = card_inv.find(material => material.id === family?.four_stars.id)

        while (true) {
          if (forge_quantity2 + card_inv_material.quantity >= card_inv_material.necessary_quantity ||
              two_stars_material.quantity - 27 < two_stars_material.necessary_quantity
            ) {
            break
          }
          forge_quantity += 1
          forge_quantity2 += 1
          two_stars_material.quantity -= 27
          card_inv_material.forged_quantity += 1
        }
        while (true) {
          if (forge_quantity3 + card_inv_material.quantity >= card_inv_material.necessary_quantity ||
              three_stars_material.quantity - 9 < three_stars_material.necessary_quantity
            ) {
            break
          }
          forge_quantity += 1
          forge_quantity3 += 1
          three_stars_material.quantity -= 9
          card_inv_material.forged_quantity += 1
        }
        while (true) {
          if (forge_quantity4 + card_inv_material.quantity >= card_inv_material.necessary_quantity ||
              four_stars_material.quantity - 3 < four_stars_material.necessary_quantity
            ) {
            break
          }
          forge_quantity += 1
          forge_quantity4 += 1
          four_stars_material.quantity -= 3
          card_inv_material.forged_quantity += 1
        }
        updateMaterialsToChange(materials_to_change, material_id, new_quantity, forge_quantity, 0)
        updateMaterialsToChange(materials_to_change, two_stars_material.id, 0, forge_quantity2, 27)
        updateMaterialsToChange(materials_to_change, three_stars_material.id, 0, forge_quantity3, 9)
        updateMaterialsToChange(materials_to_change, four_stars_material.id, 0, forge_quantity4, 3)
      }
    }
    else {
      updateMaterialsToChange(materials_to_change, material_id, new_quantity, 0, 0)
    }
  }
}
