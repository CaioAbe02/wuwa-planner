import IPlannerResonator from "@/interfaces/Resonator/IPlannerResonator"
import IPlannerWeapon from "@/interfaces/Weapon/IPlannerWeapon"

export function getArrayFromLocalStorage<T>(key: string): T[] {
  return JSON.parse(localStorage.getItem(key) || '[]')
}

export function saveArrayToLocalStorage(key: string, item: any) {
  localStorage.setItem(key, JSON.stringify(item))
}

export function removeResonatorFromLocalStorage(resonator_id: string) {
  const resonator_key = 'planner_resonators'
  const weapon_key = 'planner_weapons'
  let planner_resonators_local = getArrayFromLocalStorage<IPlannerResonator>(resonator_key)
  let planner_weapons_local = getArrayFromLocalStorage<IPlannerWeapon>(weapon_key)
  const resonator_position = planner_resonators_local.find(resonator => resonator.resonator_id === resonator_id)?.position!

  planner_resonators_local = planner_resonators_local.filter(resonator => resonator.resonator_id !== resonator_id)

  for (const resonator of planner_resonators_local) {
    resonator.position -= 1
  }

  for (const weapon of planner_weapons_local) {
    if (resonator_position < weapon.position) {
      weapon.position -= 1
    }
  }

  saveArrayToLocalStorage(resonator_key, planner_resonators_local)
  saveArrayToLocalStorage(weapon_key, planner_weapons_local)
}

export function removeWeaponFromLocalStorage(weapon_id: string) {
  const weapon_key = 'planner_weapons'
  const resonator_key = 'planner_resonators'
  let planner_weapons_local = getArrayFromLocalStorage<IPlannerWeapon>(weapon_key)
  let planner_resonators_local = getArrayFromLocalStorage<IPlannerResonator>(resonator_key)
  const weapon_position = planner_weapons_local.find(weapon => weapon.weapon_id === weapon_id)?.position!

  planner_weapons_local = planner_weapons_local.filter(weapon => weapon.weapon_id !== weapon_id)

  for (const weapon of planner_weapons_local) {
    weapon.position -= 1
  }

  for (const resonator of planner_resonators_local) {
    if (weapon_position < resonator.position) {
      resonator.position -= 1
    }
  }

  saveArrayToLocalStorage(weapon_key, planner_weapons_local)
  saveArrayToLocalStorage(resonator_key, planner_resonators_local)
}
