package utils

func MoneyToDBFormat(value int) int {
	return value * 100
}

func MoneyFromDB(value int) int {
	return value / 100
}
