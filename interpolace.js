let points = [];

function setup() {
  createCanvas(800,800);
  background(255);
  rect(1,1,width-2,height-2);
}

function mouseClicked() {
  background(255);
  rect(1,1,width-2,height-2);
  points.push([(mouseX - width / 2)/200.0, (height / 2 - mouseY)/200.0]);
  for (let i = 0; i < points.length; i++) {
    ellipse((points[i][0]*200.0 + width/2), (height/2 - points[i][1]*200.0), 20, 20);
  }
  nakresliFunkci(gauss(sestrojMatici(points)));
}

function sestrojMatici(body) {
  m = body.length;
  matice = [];
  for (let i = 0; i < m; i++) {
    matice2 = [];
    for (let j = 0; j < m - 1; j++) {
      matice2[j] = round(pow(body[i][0], (m - j - 1))*10000)/10000;
    }
    matice2.push(1);
    matice2.push(body[i][1]);
    matice[i] = matice2;
  }
  return matice;
}

function gauss(A) {
    var n = A.length;

    for (var i=0; i<n; i++) {
        // Search for maximum in this column
        var maxEl = abs(A[i][i]);
        var maxRow = i;
        for(var k=i+1; k<n; k++) {
            if (abs(A[k][i]) > maxEl) {
                maxEl = abs(A[k][i]);
                maxRow = k;
            }
        }

        // Swap maximum row with current row (column by column)
        for (var k=i; k<n+1; k++) {
            var tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
        }

        // Make all rows below this one 0 in current column
        for (k=i+1; k<n; k++) {
            var c = -A[k][i]/A[i][i];
            for(var j=i; j<n+1; j++) {
                if (i==j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                }
            }
        }
    }

    // Solve equation Ax=b for an upper triangular matrix A
    var x= new Array(n);
    for (var i=n-1; i>-1; i--) {
        x[i] = A[i][n]/A[i][i];
        for (var k=i-1; k>-1; k--) {
            A[k][n] -= A[k][i] * x[i];
        }
    }
    return x;
}

function nakresliFunkci(a) {
  let x1,x2,y1,y2;
  for (let x = 0; x < width; x++) {
    let xActual = (x - width/2)/200.0;
    let y = 0;
    for (let i = 0; i < a.length ; i++) {
      y += a[i] * pow(xActual, a.length-i-1);
    }
    x1 = xActual*200.0 + width/2;
    y1 = height/2 - y*200.0;
    if (x > 0) {
      line(x1, y1, x2, y2);
      x2 = x1;
      y2 = y1;
    }
  }
}
