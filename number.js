document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amax = parseInt(document.getElementById('amax').value);
    const d = parseInt(document.getElementById('d').value);
    
    if (isNaN(amax) || isNaN(d)) {
        alert('กรุณาใส่ตัวเลขที่ถูกต้อง');
        return;
    }
    
    if (amax <= 0 || d <= 0) {
        alert('กรุณาใส่ตัวเลขที่เป็นจำนวนเต็มบวก');
        return;
    }
    
    // คำนวณตามสูตรเดิม
    const a = amax - 1;
    const b = d + 1;
    const r = a % b;
    
    let sequence = []; // ประกาศตัวแปร sequence เพียงครั้งเดียว
    let nextNumber;
    
    if (r == 0) {                         // ""=="" คือเท่ากับ ,"=" คือกำหนดค่า
        sequence = [r + d + 1];
        nextNumber = r + d + 1 + d + 1;
    } else {
        sequence = [r];
        nextNumber = r + d + 1;
    }
    
    // เพิ่มตัวเลขถัดไปในลำดับ
    while (nextNumber <= amax - 1) {
        sequence.push(nextNumber);
        nextNumber += d + 1;
    }
    
    // แสดงผลลัพธ์
    displayResult(sequence, amax, d, r);
});

function displayResult(sequence, amax, d, r) {
    const resultDiv = document.getElementById('result');
    const sequenceDisplay = document.getElementById('sequenceDisplay');
    const calculationInfo = document.getElementById('calculationInfo');
    const sequenceCount = document.getElementById('sequenceCount');
    const rangeInfo = document.getElementById('rangeInfo');
    
    // แสดงลำดับเลข
    sequenceDisplay.innerHTML = sequence.map(num => 
        `<span class="number-item">${num}</span>`
    ).join('');
    
    // แสดงข้อมูลการคำนวณ
    if (r == 0) {
        calculationInfo.textContent = `เลขเริ่มต้น: ${r + d + 1}, ช่วงก้าว: ${d + 1} (ไม่ควรเริ่มเล่นก่อน)`;
    } else {
        calculationInfo.textContent = `เลขเริ่มต้น: ${r}, ช่วงก้าว: ${d + 1} (ควรเริ่มเล่นก่อน)`;
    }
    sequenceCount.textContent = `จำนวนเลขทั้งหมด: ${sequence.length} ตัว`;
    rangeInfo.textContent = `ช่วงค่า: ${Math.min(...sequence)} - ${Math.max(...sequence)}`;
    
    resultDiv.classList.add('show');
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}
