package common.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class RandomUtil {
	
	protected final static int MAX_RANDOM_LOOPING__COUNT = 100;
	
	public static void main(String[] args) throws Exception {
		
		System.out.println(generateTimeHash());
		
//		int[] randomArray = getRandomArray(10, 10);
		
//		printArray(randomArray);
		
//		// Random() 객체 생성
//		Random generator = new Random();
//
//		int num1;
//		float num2;
//
//		// int 값의 범위에서 정수 랜덤값을 추출한다.
//		// (-2,147,483,648 ~2,147,483,647)
//		num1 = generator.nextInt();
//		System.out.println("A random integer: " + num1);
//
//		// 0~9 사이의 정수 랜덤값을 추출한다.
//		num1 = generator.nextInt(10);
//		System.out.println("Form 0 to 9: " + num1);
//
//		// 1~10 사이의 정수랜덤값을 추출한다.
//		num1 = generator.nextInt(10) + 1;
//		System.out.println("Form 1 to 10 : " + num1);
//
//		// 20~34 사이의 정수 랜덤값을 추출한다.
//		num1 = generator.nextInt(15) + 20;
//		System.out.println("Form 20 to 34: " + num1);
//
//		// -10 ~ 9 사이의 정수 랜덤값을 추출한다.
//		num1 = generator.nextInt(20) - 10;
//		System.out.println("Form -10 to 9: " + num1);
//
//		// 0.0(포함) ~ 1.0(포함안함) 사이의 난수를 추출한다.
//		num2 = generator.nextFloat();
//		System.out.println("A random float(between 0-1): " + num2);
//
//		// 0.0 ~ 5.9999999 사이의 난수를 추출한다.
//		// int로 형 변환(0~5) 후 1을 더한다.
//		// 1~6 사이의 난수를 출력한다.
//		num2 = generator.nextFloat() * 6;
//		num1 = (int) num2 + 1;
//		System.out.println("From 1 to 6: " + num1);

	}
	
	/**
	 * 
	 * 타임스탬프를 이용한 랜덤 토큰 발생
	 * 
	 * @return 랜덤 타임스탬프 해시 토큰
	 * @throws Exception 
	 */
	@SuppressWarnings("unused")
	public static long generateTimeHash() throws Exception {
		SimpleDateFormat formatter = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
		Calendar cal = Calendar.getInstance();
		String today = null;
//		today = formatter.format(cal.getTimeInMillis());
//		Timestamp ts = Timestamp.valueOf(today);
		
		return cal.getTimeInMillis();
	}
	
	
	/**
	 * 
	 * 최대값과 리턴 갯수를 지정하여 자연수 랜덤값을 리턴받는다. 중복값은 제외된다.
	 * 단, 최대값보다 리턴 갯수가 클 경우 중복값이 발생 할 수 있다. 
	 * 
	 * @param maxValue		랜덤 최대값
	 * @param randomCount	배열로 리턴받을 랜덤값 갯수
	 * @param detectDupMap	중복되지 않아야 할 값이 들어있는 맵
	 * @return
	 */
	public static int[] getRandomArray(int maxValue, int randomCount, Map<Integer, Integer> detectDupMap) {
		// Random() 객체 생성
		Random generator = new Random();
		
		// 린턴 배열
		int[] randomArray = new int[randomCount];
		
		for ( int ii = 0 ; ii < randomCount ; ii++ ) {
			// 중복값 방지
			boolean isDuplicated = true;
			int loopingCnt = 0;
			
			while (isDuplicated && loopingCnt < MAX_RANDOM_LOOPING__COUNT) {
				int value = randomArray[ii] = generator.nextInt(maxValue) + 1;
				if ( detectDupMap.get(value) != null ) {
				} else {
					detectDupMap.put(value, value);
					isDuplicated = false;
				}
				
				loopingCnt++;
			}
			
		}
		
		return randomArray;
	}
	
	/**
	 * 
	 * 최대값과 리턴 갯수를 지정하여 자연수 랜덤값을 리턴받는다. 중복값은 제외된다.
	 * 단, 최대값보다 리턴 갯수가 클 경우 중복값이 발생 할 수 있다. 
	 *  
	 * @param maxValue 랜덤 최대값
	 * @param randomCount 배열로 리턴받을 랜덤값 갯수
	 * @return
	 */
	public static int[] getRandomArray(int maxValue, int randomCount) {
		// 중복값 방지
		Map<Integer, Integer> detectDupMap = new HashMap<Integer, Integer>();
		
		int[] randomArray = getRandomArray(maxValue, randomCount, detectDupMap);
		
		return randomArray;
	}
	
	public static void printArray(int[] array) {
		int value = 0;
		
		for ( int ii = 0 ; ii < array.length ; ii++ ) {
			value = array[ii];
			System.out.println("\nindex:" + ii + ", value:" + value);
		}
	}
}
