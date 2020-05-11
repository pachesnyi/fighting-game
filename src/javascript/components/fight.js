import { controls } from '../../constants/controls';

export async function fight(leftFighter, rightFighter) {
  return new Promise(resolve => {
    const arenaFirstFighter = createArenaFighter(leftFighter);
    const arenaSecondFighter = createArenaFighter(rightFighter);

    const pressedKeys = new Map();

    document.addEventListener('keydown', (e) => {
      pressedKeys.set(e.code, true);

      processFightAction(arenaFirstFighter, arenaSecondFighter, pressedKeys);

      if (arenaFirstFighter.currentHealth <= 0 || arenaSecondFighter.currentHealth <= 0) {
        const winner = arenaFirstFighter.currentHealth <= 0 ? rightFighter : leftFighter;
        resolve(winner);
      };
    });

    document.addEventListener('keyup', (e) => {
      pressedKeys.delete(e.code);
    });
  });
}

function createArenaFighter(fighter) {
  return {
    ...fighter,
    currentHealth: fighter.health,
    criticalHitCooldown: new Date(),
    setCooldown() {
      this.criticalHitCooldown = new Date();
    },
  };
}

function processFightAction(leftFighter, rightFighter, keyMap) {
  const leftHealthIndicator = document.getElementById('left-fighter-indicator');
  const rightHealthIndicator = document.getElementById('right-fighter-indicator');

  switch(true) {
    case keyMap.has(controls.PlayerOneAttack): {
      applyFighterAttack(leftFighter, rightFighter, rightHealthIndicator, keyMap);
    };break;
    case keyMap.has(controls.PlayerTwoAttack): {
      applyFighterAttack(rightFighter, leftFighter, leftHealthIndicator, keyMap);
    };break;
    case controls.PlayerOneCriticalHitCombination.every(code => keyMap.has(code)): {
      applyFighterCriticalAttack(leftFighter, rightFighter, rightHealthIndicator);
    };break;
    case controls.PlayerTwoCriticalHitCombination.every(code => keyMap.has(code)): {
      applyFighterCriticalAttack(rightFighter, leftFighter, leftHealthIndicator);
    };break;
  };
}

function applyFighterAttack(attacker, defender, healthIndicator, keyMap) {
  if (isAttackBlocked(keyMap)) return;

  defender.currentHealth -= getDamage(attacker, defender);
  updateHealthIndicator(defender, healthIndicator);
}

function applyFighterCriticalAttack(attacker, defender, healthIndicator) {
  if (isCriticalHitCooldown(attacker)) return;

  defender.currentHealth -= attacker.attack * 2;
  updateHealthIndicator(defender, healthIndicator);

  attacker.setCooldown();
}

function isAttackBlocked(keyMap) {
  return keyMap.has(controls.PlayerOneBlock) || keyMap.has(controls.PlayerTwoBlock);
}

function isCriticalHitCooldown(attacker) {
  const cooldownSeconds = (new Date().getTime() - attacker.criticalHitCooldown.getTime()) / 1000;
  return cooldownSeconds < 10;
}

export function getDamage(attacker, defender) {
  return Math.max(0, getHitPower(attacker) - getBlockPower(defender));
}

export function getHitPower(fighter) {
  const { attack } = fighter;
  const criticalHitChance = randomInteger(1, 2);

  return attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  const { defense } = fighter;
  const dodgeChance = randomInteger(1, 2);

  return defense * dodgeChance;
}

function updateHealthIndicator(defender, indicator) {
  const { health, currentHealth } = defender;

  const indicatorWidth = Math.max(0, (currentHealth * 100) / health);
  indicator.style.width = `${indicatorWidth}%`;
}

function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
