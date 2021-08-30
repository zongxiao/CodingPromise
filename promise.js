function Promise(executor) {
  // 定义对象状态值、结果值
  this.PromiseState = "pending";
  this.PromiseResult = null;

  // 获取实例的this并保存进instanceThis
  const instanceThis = this;

  // 定义then回调函数
  this.callback = {
    
  }

  // resolve函数
  function resolve(value) {
    // 对象状态只能从'pending'改成'fulfilled'或者'rejected'
    if (instanceThis.PromiseState !== 'pending') return ;
    // 修改对象状态（也就是修改PromiseState属性值）、设置对象结果值（也就是设置PromiseResult属性值）
    instanceThis.PromiseState = "fulfilled";
    instanceThis.PromiseResult = value;
  }

  // reject函数
  function reject(errorValue) {
    if (instanceThis.PromiseState !== 'pending') return ;
    instanceThis.PromiseState = "rejected";
    instanceThis.PromiseResult = errorValue;
  }

  // 处理throw抛出异常
  try {
    // 同步调用 执行器函数
    executor(resolve, reject);
  } catch (error) {
    // 捕获到抛出异常，需要将对象状态值设置为rejected
    reject(error);
  }

}

// 添加then方法
Promise.prototype.then = function(onResolve, onReject) {
  // 这里面的this指向的就是调用then函数的实例

  // 如果此时状态为fulfilled，执行then里面成功的回调函数
  if (this.PromiseState === 'fulfilled') {
    onResolve(this.PromiseResult);
  }
  // 如果此时状态为rejected，执行then里面失败的回调函数
  if (this.PromiseState === 'rejected') {
    onReject(this.PromiseResult);
  }
}