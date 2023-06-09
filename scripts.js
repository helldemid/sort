
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function quickSort(arr, low, high) {
    if (low < high) {
      var pivotIndex = await partition(arr, low, high);
      await quickSort(arr, low, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, high);
    }
  }
  
  async function partition(arr, low, high) {
    var pivot = arr[high];
    var i = low - 1;
  
    for (var j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        await swap(arr, i, j);
        await displaySwap(i, j, arr)
        //await sleep(100);
      }
    }
  
    await swap(arr, i + 1, high);
    await displaySwap(i + 1, high, arr)
    //await sleep(100);
    return i + 1;
  }
  
  async function swap(arr, i, j) {

    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

  }

  async function ShellSort(arr) {
    var n = arr.length;
    for (var step = Math.floor(n / 2); step > 0; step = Math.floor(step / 2)) {
      for (var i = step; i < n; i++) {
        for (var j = i - step; j >= 0 && arr[j] > arr[j + step]; j -= step) {
          if (arr[j] > arr[j + step]) {
            var temp = arr[j];
            arr[j] = arr[j + step];
            arr[j + step] = temp;
            await displaySwap(j, (j+step), arr)
          }
        }
      }
    }
    console.log(arr)
  }


  async function displaySwap(i, j, arr) {
    var barElem1 = $(`div.bar[index="${i}"]`);
    var barElem2 = $(`div.bar[index="${j}"]`);
    barElem1.addClass('activeBar')
    barElem2.addClass('activeBar')

    if (arr[i] == 0) {
      barElem1.css('height', "1px");
    } else {
        barElem1.css('height', `${arr[i]}%`);
    }

    if (arr[j] == 0) {
        barElem2.css('height', "1px");
    } else {
        barElem2.css('height', `${arr[j]}%`);
    }
    await sleep(100);
    barElem1.removeClass('activeBar')
    barElem2.removeClass('activeBar')
    

  }

  async function bubbleSort(arr) {
    const len = arr.length;
    let swapped;
    
    do {
      swapped = false;
      
      for (let i = 0; i < len - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          // Меняем элементы местами
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          
          swapped = true;

        var barElem1 = $('div.bar[index="' + i + '"]');
        var barElem2 = $(`div.bar[index="${i + 1}"]`);
        
        barElem1.addClass('activeBar')
        barElem2.addClass('activeBar')
        

        if (arr[i] == 0) {
            barElem1.css('height', "1px");
        } else {
            barElem1.css('height', `${arr[i]}%`);
        }

        if (arr[i+1] == 0) {
            barElem2.css('height', "1px");
        } else {
            barElem2.css('height', `${arr[i + 1]}%`);
        }
        await sleep(100);
        barElem1.removeClass('activeBar')
        barElem2.removeClass('activeBar')
          // Отображение и задержка для иллюстрации сортировки
          //await displayBars(arr);
          
        }
      }
    } while (swapped);
    
    return arr;
  }

  async function displayBars(arr) {
    const barsDiv = $('#bars');
    barsDiv.empty();
    
    for (let i = 0; i < arr.length; i++) {
      const barHeight = arr[i] * 10;
      const bar = $('<div>').addClass('bar').css('height', barHeight + 'px');
      barsDiv.append(bar);
    }
  }

  $('#add').on('click', function(){
    nextIndex = $('#bars').children().length
    newInput = "<input type=\"number\" value=\"0\" min = \"0\" max=\"100\" index = \"" + nextIndex + "\">"
    $('.initial_array').append(newInput)
    newBar = "<div class=\"bar\" index = \"" + nextIndex + "\"></div>"
    $('#bars').append(newBar)
  })

  $('#delete').on('click', function(){
    $('.initial_array').children().last().remove();
    $('#bars').children().last().remove();
  })

  function shuffleArray(n) {
    var arr = [];
    
    // Заполняем массив числами от 1 до n
    for (var i = 1; i <= n; i++) {
      arr.push(i);
    }
    
    // Применяем алгоритм Фишера-Йетса для перемешивания элементов массива
    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    
    return arr;
  }

  $('#rand').click(function() {
    $('.initial_array input[type="number"]').each(function() {
        var min = parseInt($(this).attr('min'));
        var max = parseInt($(this).attr('max'));
        var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        $(this).val(randomNum);

        currIndex = $(this).attr('index')
        var barElem = $('div.bar[index="' + currIndex + '"]');
        if(randomNum == 0) {
            barElem.css('height', "1px")
        } else {
            barElem.css('height', randomNum + "%")
        }

    });
  });

  $('#sort').click(function() {
    console.log("Я нажалась")
    var values = []
    $('.initial_array input[type="number"]').each(function() {
        values.push(parseInt($(this).val()))
    })
    $(this).prop('disabled', true)
    const met = $('#method').find(':selected').attr('sort-methon');
    switch (met) {
      case "buble":
        bubbleSort(values)
        break;
      case "quick":
        quickSort(values, 0, values.length - 1);
        break;
      case "shell":
        ShellSort(values);
        break;
    }
    $(this).prop('disabled', false)

  })

  $('.initial_array').on('input change', 'input[type="number"]', function() {
    
    let newValue = $(this).val();
    if(newValue > 100) {
        $(this).val(100)
        newValue = 100
    } else if(newValue < 0) {
        $(this).val(0)
        newValue = 0
    }
    let currIndex = $(this).attr('index');
    var barElem = $('div.bar[index="' + currIndex + '"]');
    if (newValue == 0) {
      barElem.css('height', "1px");
    } else {
      barElem.css('height', newValue + "%");
    }
  });
  
