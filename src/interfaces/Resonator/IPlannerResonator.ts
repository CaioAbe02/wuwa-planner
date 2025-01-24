export default interface IPlannerResonator {
  id: string,
  type: string,
  position: number,
  visible: boolean,
  resonator_id: string,
  level: number,
  new_level: number,
  ascention_level: number,
  new_ascention_level: number,
  forte: {
    normal_attack_level: number,
    new_normal_attack_level: number,
    ressonance_skill_level: number,
    new_ressonance_skill_level: number,
    forte_circuit_level: number,
    new_forte_circuit_level: number,
    ressonance_liberation_level: number,
    new_ressonance_liberation_level: number,
    intro_skill_level: number,
    new_intro_skill_level: number,
    inherent_skills: boolean[],
    stats_bonus: boolean[]
  }
}
