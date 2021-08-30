function Promise(executor) {
  // 定义对象状态值、结果值
  this.PromiseState = "pending";
  this.PromiseResult = null;

  // 获取实例的this并保存进instanceThis
  const instanceThis = this;

  // resolve函数
  function resolve(value) {
    
    // 判断对象状态是否已经被改变过
    if (instanceThis.PromiseState !== 'pending') return ;

    // 1、修改对象状态（也就是修改PromiseState属性值）
    // 2、设置对象结果值（也就是设置PromiseResult属性值）
    instanceThis.PromiseState = "fulfilled";
    instanceThis.PromiseResult = value;
  }

  // reject函数
  function reject(errorValue) {
    if (instanceThis.PromiseState !== 'pending') return ;
    instanceThis.PromiseState = "rejected";
    instanceThis.PromiseResult = errorValue;
  }


  // 同步调用 执行器函数
  executor(resolve, reject);
}

// 添加then方法
Promise.prototype.then = function(onResolve, onReject) {

}